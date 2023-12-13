Что бы запустить проект, необходимо создать любую пустую БД на вашей локальной машине
Параметры подключения следует указать в backend\db\knexfile.js

После создания БД можно открывать терминал и вводить команды:

task_tracker> cd backend
task_tracker\backend> npm install
task_tracker\backend> npm run knex:migrate
task_tracker\backend> npm run knex:seed
task_tracker\backend> npm run serve
task_tracker\backend> cd ..
task_tracker> cd frontend
task_tracker\frontend> npm install
task_tracker\frontend> npm run start
