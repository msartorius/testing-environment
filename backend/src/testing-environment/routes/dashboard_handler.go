package routes

import (
	"time"
	"net/http"

	"gopkg.in/mgo.v2/bson"
	"github.com/labstack/echo"
	"github.com/labstack/gommon/log"

	"testing-environment/model"
	"testing-environment/database"
)

func DashboardPostHandler(c echo.Context) (err error) {

	d, err := getDatesFromForm(c)

	if err != nil {
		log.Warn(err)
		return c.JSON(http.StatusBadRequest, err)
	}

	session := database.DBUserColl()

	if err != nil {
		log.Warn(err)
		return c.JSON(http.StatusBadRequest, err)
	}

	u := []model.User{}
	session.Find(
		bson.M{
			model.Timestamp: bson.M{
				"$gt": d.StartDate,
				"$lt": d.EndDate,
			},
		}).All(&u)

	if err != nil {
		log.Warn(err)
		return c.JSON(http.StatusBadRequest, err)
	}

	m := make(map[int]int)
	for _,element := range u {
		m[element.Timestamp.Day()] = m[element.Timestamp.Day()] + 1
	}

	return c.JSON(http.StatusOK, m)
}

func getDatesFromForm(c echo.Context) (d model.DashboardDate, err error) {
	startDate := c.FormValue(model.StartDate);
	endDate := c.FormValue(model.EndDate);
	d.StartDate, err = time.Parse(time.RFC3339, startDate);
	if err != nil {
		return d, err
	}
	d.EndDate, err = time.Parse(time.RFC3339, endDate);
	return d, err
}