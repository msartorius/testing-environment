package config

import (
	"fmt"
	"flag"

	"github.com/spf13/viper"
	"github.com/labstack/gommon/log"

	"testing-environment/model"
)

var c model.Config

const configFormat = "yaml"
const defaultPathToConfig = "config"
const defaultConfigFileName = "config-dev"

func GetConfig() model.Config {

	configName := flag.String("configName", defaultConfigFileName, "Name of the config file")
	configPath := flag.String("configPath", defaultPathToConfig, "Path of the config file")
	flag.Parse()

	log.Infof("Started with %s config", *configName)
	log.Infof("In Path %s config", *configPath)

	viper.AddConfigPath(*configPath)
	viper.SetConfigType(configFormat)
	viper.SetConfigName(*configName)

	err := viper.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("Fatal error config file: %s \n", err))
	}
	err = viper.Unmarshal(&c)
	if err != nil {
		panic(err)
	}
	return c
}
