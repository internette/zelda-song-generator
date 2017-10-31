rsync --exclude='node_modules/' \
      -rave 'ssh -i ~/Downloads/daily-todo-notification-db.pem' ./server/* ubuntu@ec2-34-228-201-183.compute-1.amazonaws.com:~/server