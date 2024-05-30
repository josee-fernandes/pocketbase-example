/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dfg3m1foope5ggm");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "dfg3m1foope5ggm",
    "created": "2024-05-30 02:23:32.375Z",
    "updated": "2024-05-30 02:23:32.375Z",
    "name": "exampleAuth",
    "type": "auth",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "p4y1irgb",
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
      "allowUsernameAuth": true,
      "exceptEmailDomains": null,
      "manageRule": null,
      "minPasswordLength": 5,
      "onlyEmailDomains": null,
      "onlyVerified": false,
      "requireEmail": true
    }
  });

  return Dao(db).saveCollection(collection);
})
