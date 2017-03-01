package model

import (
	"time"

	"github.com/satori/go.uuid"
)

//Fieldnames
const Id string = "id"
const FirstName string = "firstname"
const FamilyName string = "familyname"
const Email string = "email"
const Timestamp string = "timestamp"

type User struct {
	Id uuid.UUID `json:"id" form:"id" query:"id"`
	FirstName  string `json:"firstname" form:"firstname" query:"firstname"`
	FamilyName  string `json:"familyname" form:"familyname" query:"familyname"`
	Email string `json:"email" form:"email" query:"email"`
	Timestamp time.Time `bson:"timestamp" json:"timestamp" form:"timestamp" query:"timestamp"`
}