const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
	Post.findAll({
		where: {
			UserId: req.session.UserId,
		},
	})
		.then((dbPostData) => {
			const Posts = dbPostData.map((post) => post.get({ plain: true }));

			res.render('all-Posts-admin', {
				layout: 'dashboard',
				Posts,
			});
		})
		.catch((err) => {
			console.log(err);
			res.redirect('login');
		});
});

router.get('/add-post', withAuth, (req, res) => {
	res.render('add-post', {
		layout: 'dashboard',
	});
});

router.get('/edit/:id', withAuth, (req, res) => {
	Post.findByPk(req.params.id)
		.then((dbPostData) => {
			if (dbPostData) {
				const post = dbPostData.get({ plain: true });

				res.render('edit-post', {
					layout: 'dashboard',
					post,
				});
			} else {
				res.status(404).end();
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;
