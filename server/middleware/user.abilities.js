const { AbilityBuilder, Ability } = require('@casl/ability');

function defineAbilitiesFor(user) {
    const { can, build } = new AbilityBuilder(Ability);

    if (!user?.role) {
        return build();
    }

    if (user.role.readUser) {
        can('read', ['User']);
    }

    if (user.role.createUser) {
        can('create', ['User']);
    }

    if (user.role.updateUser) {
        can('create', ['User']);
    }

    if (user.role.deleteUser) {
        can('delete', ['User']);
    }

    return build();
}

const ANONYMOUS_ABILITY = defineAbilitiesFor(null);

function createAbilities(req, res, next) {
    req.ability = req.user ? defineAbilitiesFor(req.user) : ANONYMOUS_ABILITY;
    next();
}

module.exports = createAbilities;
