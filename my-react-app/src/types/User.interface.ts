export interface UserInterface {
  id: string
  createdAt: string
  usersData: {
    username: string
    email: string
    password: string
    confirmPassword: string
  }
}