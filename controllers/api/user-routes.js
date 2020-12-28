const router = require('express').Router();
const { User } = require('../../models/User');

router.post('/', (req, res) => {
	User.create({
		Username: req.body.Username,
		password: req.body.password,
	})
		.then((dbUserData) => {
			req.session.save(() => {
				req.session.UserId = dbUserData.id;
				req.session.Username = dbUserData.Username;
				req.session.loggedIn = true;

				res.json(dbUserData);
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post('/login', (req, res) => {
	User.findOne({
		where: {
			Username: req.body.Username,
		},
	}).then((dbUserData) => {
		if (!dbUserData) {
			res.status(400).json({ message: 'No User account found!' });
			return;
		}

		const validPassword = dbUserData.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({ message: 'Incorrect password!' });
			return;
		}

		req.session.save(() => {
			req.session.UserId = dbUserData.id;
			req.session.Username = dbUserData.Username;
			req.session.loggedIn = true;

			res.json({ User: dbUserData, message: 'You are now logged in!' });
		});
	});
});

router.post('/logout', (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

router.delete('/User/:id', (req, res) => {
	User.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: 'No User found with this id' });
				return;
			}
			res.json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
