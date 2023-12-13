Что бы запустить проект, необходимо создать любую пустую БД на вашей локальной машине, а так же склоинровать данный репозиторий на ту же машину
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

логины/пароли:
director1/director1
director2/director2
user1/user1
user2/user2
user3/user3
user4/user4
user5/user5
