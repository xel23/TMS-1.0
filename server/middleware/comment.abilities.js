const { AbilityBuilder, Ability } = require('@casl/ability');

function defineAbilitiesFor(user) {
    const { can, build } = new AbilityBuilder(Ability);

    if (!user?.role) {
        return build();
    }

    if (user.role.readTask) {
        can('read', ['Comment']);
    }

    if (user.role.updateTask) {
        can('update', ['Comment']);
        can('create', ['Comment']);
        can('delete', ['Comment']);
    }

    return build();
}

const ANONYMOUS_ABILITY = defineAbilitiesFor(null);

function createAbilities(req, res, next) {
    req.ability = req.user.userId ? defineAbilitiesFor(req.user) : ANONYMOUS_ABILITY;
    next();
}

module.exports = createAbilities;
