import UserController from '../controllers/user.controller';

export default [
  {
    method: 'POST',
    path: '/user/getToken',
    handler: UserController.getToken,
    validator: [],
  },
]