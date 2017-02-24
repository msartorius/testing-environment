package database

import (
	"gopkg.in/mgo.v2"

	"testing-environment/model"
)

var dbSession *mgo.Session
var database *mgo.Database
var err error
const userCollName = "user"

func Connect(cfg model.Config) {
	dbSession, err = mgo.Dial(cfg.Db.Url)
	database = dbSession.DB(cfg.Db.Name)
	if err != nil {
		panic(err)
	}
}

func GetCurrentDBSessionFor(collectionName string) (*mgo.Collection) {
	return database.C(collectionName)
}

func Close() {
	dbSession.Close()
}

func DBUserColl() (*mgo.Collection) {
	return GetCurrentDBSessionFor(userCollName)
}
