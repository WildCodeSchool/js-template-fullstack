mysql -u root -p$MYSQL_ROOT_PASSWORD --execute \
"GRANT ALL PRIVILEGES ON *.* TO '$MYSQL_USER'@'%';"