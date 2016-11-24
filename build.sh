rm -rf ./build &&
mkdir ./build &&
cp index.js build/index.js &&
cp -R app build/app &&
cp  ./package.json ./build/package.json &&
cd build &&
npm i --production &&
cd .. &&
tar -zcvf metrolink.tar.gz build/*
