const { AbilityBuilder, Ability } = require('@casl/ability');

function defineAbilitiesFor(user) {
    const { can, build } = new AbilityBuilder(Ability);

    if (user.role.readTask) {
        can('read', ['Task']);
    }

    if (user.role.createTask) {
        can('create', ['Task']);
    }

    if (user.role.updateTask) {
        can('update', ['Task']);
    }

    if (user.role.deleteTask) {
        can('delete', ['Task']);
    }

    return build();
}

const ANONYMOUS_ABILITY = defineAbilitiesFor(null);

function createAbilities(req, res, next) {
    req.ability = req.user.userId ? defineAbilitiesFor(req.user) : ANONYMOUS_ABILITY;
    next();
}

module.exports = createAbilities;
