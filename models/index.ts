import Users from "./users";
import Blog from "./blogs";

Users.hasMany(Blog)
Blog.belongsTo(Users)

Users.sync()
Blog.sync()

export {
    Users,
    Blog
}