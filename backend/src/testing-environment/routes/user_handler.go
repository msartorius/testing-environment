package routes

import (
	"time"
	"net/http"

	"github.com/labstack/echo"
	"github.com/satori/go.uuid"
	"gopkg.in/mgo.v2/bson"
	"github.com/labstack/gommon/log"

	"testing-environment/model"
	"testing-environment/database"
)

func UserPostHandler(c echo.Context) (err error) {
	u := new(model.User)

	if err = c.Bind(u); err != nil {
		log.Warn(err)
		return c.JSON(http.StatusBadRequest, err)
	}
	session := database.DBUserColl()
	u.Id = uuid.NewV4();
	u.Timestamp = time.Now()
	err = session.Insert(u)
	if err != nil {
		log.Warn(err)
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusOK, u)
}

func UserDeleteHandler(c echo.Context) (err error) {
	session := database.DBUserColl()
	val, err := uuid.FromString(c.Param(model.Id))
	err = session.Remove(bson.M{model.Id:  val})
	if err != nil {
		log.Warn(err)
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusOK, val);
}

func UserPutHandler(c echo.Context) (err error) {
	u := new(model.User)
	if err = c.Bind(u); err != nil {
		log.Warn(err)
		return c.JSON(http.StatusBadRequest, err)
	}
	session := database.DBUserColl()
	colQuery := bson.M{model.Id: u.Id}
	change := bson.M{"$set": bson.M{
		model.FirstName: u.FirstName,
		model.FamilyName: u.FamilyName,
		model.Email: u.Email,
		model.Timestamp: u.Timestamp}}
	err = session.Update(colQuery, change)
	if err != nil {
		log.Warn(err)
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusOK, u)
}

func UserGetAllHandler(c echo.Context) (err error) {
	session := database.DBUserColl()
	u := []model.User{}
	err = session.Find(nil).All(&u)
	return c.JSON(http.StatusOK, u)
}

func UserGetByIdHandler(c echo.Context) (err error) {
	session := database.DBUserColl()
	u := model.User{}
	val, err := uuid.FromString(c.Param(model.Id))
	if err != nil {
		log.Warn(err)
		return c.JSON(http.StatusBadRequest, err)
	} else {
		err = session.Find(bson.M{model.Id: val}).One(&u)
		if err != nil {
			log.Warn(err)
		}
		return c.JSON(http.StatusOK, u)
	}
}



