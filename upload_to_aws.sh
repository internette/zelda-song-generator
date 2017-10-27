rsync --exclude='node_modules/' \
      -rave 'ssh -i ~/Downloads/daily-todo-notification-db.pem' ./db/server/* ubuntu@ec2-34-228-201-183.compute-1.amazonaws.com:~/zelda-song-generator/server