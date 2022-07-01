'use strict';




// убр самопал проверки, перевести все на joi



const {application} = require(`./cli`);

const {getLogger} = require(`./lib/logger`);

const USERS_APPLICATION_ARGUMENT = 2;
const USERS_COMMAND_GENERATE_ARGUMENT = 3;

const usersCommandArgument = process.argv[USERS_APPLICATION_ARGUMENT]?.replace(`--`, ``);
const usersCommandGenerateArgument = process.argv[USERS_COMMAND_GENERATE_ARGUMENT];

const applicationCommand = application[usersCommandArgument];

const logger = getLogger(`service`);

if (!applicationCommand) {
  logger.error(`Запуск приложения с несуществующим аргументом.`);
  process.exit(1);
}

applicationCommand.run(usersCommandGenerateArgument);
