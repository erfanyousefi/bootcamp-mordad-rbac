function RbacGuard (requirePermission = []) {
    return function (req, res, next) {
        if (!requirePermission || requirePermission.length === 0) {
            return next();
        }
        const user = req?.user ?? {};
        if (!user) throw {status: 401, message: "وارد حساب کاربری خود شوید"};
        const userPermissions = user?.role?.permissions?.map(p => p.name);
        if (!userPermissions) throw {status: 403, message: "شما مجوز لازم را ندارید"};
        const hasPermission = userPermissions.some(p => requirePermission.includes(p));
        if (!hasPermission) throw {status: 403, message: "شما مجوز لازم را ندارید"};
        return next();
    };
}
module.exports = RbacGuard;