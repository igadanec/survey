# After cloning project
```
npm install

npm run serve
```

# Start database
```
npx json-server --watch db.json --routes routes.json
```

# Run cypress tests

First you have to run project and database
```
npm run serve
npx json-server --watch db.json --routes routes.json
```

After starting project and database
```
npx cypress open
```

