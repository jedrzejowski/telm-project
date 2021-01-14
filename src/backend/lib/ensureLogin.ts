import eam from "../eam";

export default function ensureLoggedIn() {

    return eam(async (req, res, next) => {
        if (!req.isAuthenticated()) {
            res.status(400);
            res.send('None shall pass');
            return;
        }
        next();
    });
}