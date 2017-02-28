package routes

import (
	"net/http"
	"time"
	"strings"

	"github.com/labstack/echo"
	"github.com/labstack/gommon/log"
	"github.com/satori/go.uuid"
	"gopkg.in/mgo.v2/bson"

	"testing-environment/database"
	"testing-environment/model"
)

func UserPostHandler(c echo.Context) error {
	u := new(model.User)

	if err := c.Bind(u); err != nil {
		log.Warn(err)
		return c.JSON(http.StatusBadRequest, err)
	}
	session := database.DBUserColl()
	u.Id = uuid.NewV4()
	u.Timestamp = time.Now()
	err := session.Insert(u)
	if err != nil {
		log.Warn(err)
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusOK, u)
}

func UserDeleteHandler(c echo.Context) error {
	session := database.DBUserColl()
	val, err := uuid.FromString(c.Param(model.Id))
	err = session.Remove(bson.M{model.Id: val})
	if err != nil {
		log.Warn(err)
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusOK, val)
}

func UserPutHandler(c echo.Context) error {
	u, err := bindFormDataToUser(c);
	if err != nil {
		log.Warn(err)
		return c.JSON(http.StatusBadRequest, err)
	}
	session := database.DBUserColl()
	colQuery := bson.M{model.Id: u.Id}
	change := bson.M{"$set": bson.M{
		model.FirstName:  u.FirstName,
		model.FamilyName: u.FamilyName,
		model.Email:      u.Email,
		model.Timestamp:  u.Timestamp}}
	err = session.Update(colQuery, change)
	if err != nil {
		log.Warn(err)
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusOK, u)
}

func UserGetAllHandler(c echo.Context) error {
	session := database.DBUserColl()
	var u []model.User
	err := session.Find(nil).All(&u)
	if err != nil {
		log.Warn(err)
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusOK, u)
}

func UserGetByIdHandler(c echo.Context) error {
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

func bindFormDataToUser(c echo.Context) (u *model.User, err error) {
	u = new(model.User)

	u.Id, err = uuid.FromString(c.FormValue(model.Id))
	if err != nil {
		return u, err
	}
	u.FirstName = c.FormValue(model.FirstName)
	u.FamilyName = c.FormValue(model.FamilyName)
	u.Email = c.FormValue(model.Email)
	u.Timestamp, err = time.Parse(time.RFC3339, strings.Replace(c.FormValue(model.Timestamp), " ", "+", -1))
	if err != nil {
		return u, err
	}
	return u, err
}