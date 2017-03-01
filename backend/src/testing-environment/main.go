package main

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	"testing-environment/model"
	"testing-environment/database"
	"testing-environment/config"
	"testing-environment/routes"
)

var C model.Config = config.GetConfig()

func main() {

	router := echo.New()

	database.Connect(C)
	defer database.Close()

	router.Use(middleware.Logger())
	router.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowHeaders: []string{echo.HeaderContentType},
	}))

	// Dashboard Routes
	router.POST("/api/dashboard", routes.DashboardPostHandler)

	// User Routes
	router.POST("/api/user", routes.UserPostHandler)
	router.PUT("/api/user", routes.UserPutHandler)
	router.DELETE("/api/user/:id", routes.UserDeleteHandler)
	router.GET("/api/users", routes.UserGetAllHandler)
	router.GET("/api/users/:id", routes.UserGetByIdHandler)

	// Error Handler
	router.HTTPErrorHandler = func(e error, c echo.Context) {
		he, castOk := e.(*echo.HTTPError)
		if castOk && he.Code == http.StatusNotFound {
			c.File(C.Server.StaticRoot + "/index.html")
		} else {
			router.DefaultHTTPErrorHandler(e, c)
		}
	}

	router.Static("/", C.Server.StaticRoot)

	router.Logger.Fatal(router.Start(C.Server.Port))
}

