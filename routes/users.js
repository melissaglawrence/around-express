const router = require('express').Router();
const {
  getUsersInfo,
  getUsersId,
  createUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsersInfo);
router.get('/:id', getUsersId);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
