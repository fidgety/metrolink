rm -rf ./build &&
mkdir ./build &&
cp index.js build/index.js &&
cp api.js build/api.js &&
cp  ./package.json ./build/package.json &&
cd build &&
npm i --production &&
cd .. &&
tar -zcvf metrolink.tar.gz build/*
