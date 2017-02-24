package model

type Config struct {
	Server struct {
		       Port string `mapstructure:"port"`
		       Url string `mapstructure:"url"`
		       StaticRoot string `mapstructure:"static-root"`
	       }`mapstructure:"server"`
	Db struct {
		       Name string `mapstructure:"name"`
		       Url string `mapstructure:"url"`
	       } `mapstructure:"db"`
}