/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "kz89omqunewte9n",
    "created": "2024-05-30 02:25:39.435Z",
    "updated": "2024-05-30 02:25:39.435Z",
    "name": "exampleAuth",
    "type": "auth",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zakagjbn",
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
      "allowEmailAuth": true,
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
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("kz89omqunewte9n");

  return dao.deleteCollection(collection);
})
