mongo express-g-demo --eval "var collection = 'movies'" variety.js >> result/movies.json 
mongo express-g-demo --eval "var collection = 'sangs'" variety.js >> result/sangs.json 
mongo express-g-demo --eval "var collection = 'sessions'" variety.js >> result/sessions.json 
mongo express-g-demo --eval "var collection = 'users'" variety.js >> result/users.json 
sed -i '' -e '1,12d' result/movies.json 
sed -i '' -e '1,12d' result/sangs.json 
sed -i '' -e '1,12d' result/users.json 
sed -i '' -e '1,12d' result/sessions.json 
