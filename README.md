# Crypto Vision

Script qui permet de visualiser votre portefeuille de cryptomonnaies réparti sur plusieurs exchanges. Il récupère les données via les API.

Il récupère aussi via Google Sheets des données en dehors des exchanges comme par exemple le contenu de vos ledgers nano S.

## Comment le faire fonctionner en dev mode ?

- créer un .env à partir d'une copie de .env.exemple et y ajouter les clés et secrets
- faire de même avec le fichier client_secret.json.exemple
- npm i
- vérifier que les tests passent via npm t
- builder via npm run build:watch
- voir le résultat sur le terminal via npm start
- pour la parti Google Sheet, la doc n'est pas encore faite

## Il y a aussi d'autres commandes, voir le package.json
