/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3kjrd2opihj5ss5");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "3kjrd2opihj5ss5",
    "created": "2024-05-30 01:18:26.814Z",
    "updated": "2024-05-30 01:18:26.814Z",
    "name": "exampleAuth",
    "type": "auth",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "uqap4sal",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": "id = @request.auth.id",
    "updateRule": "id = @request.auth.id",
    "deleteRule": "id = @request.auth.id",
    "options": {
      "allowEmailAuth": false,
      "allowOAuth2Auth": true,
      "allowUsernameAuth": false,
      "exceptEmailDomains": null,
      "manageRule": null,
      "minPasswordLength": 0,
      "onlyEmailDomains": null,
      "onlyVerified": false,
      "requireEmail": true
    }
  });

  return Dao(db).saveCollection(collection);
})
