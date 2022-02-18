'use strict';

const {application} = require(`./cli`);

const USERS_APPLICATION_ARGUMENT = 2;
const USERS_COMMAND_GENERATE_ARGUMENT = 3;

const usersCommandArgument = process.argv[USERS_APPLICATION_ARGUMENT].replace(`--`, ``);
const usersCommandGenerateArgument = process.argv[USERS_COMMAND_GENERATE_ARGUMENT];

const applicationCommand = application[usersCommandArgument];

if (!applicationCommand) {
  console.log(`Запуск приложения с несуществующим аргументом.`);
  process.exit(1);
}

applicationCommand.run(usersCommandGenerateArgument);
