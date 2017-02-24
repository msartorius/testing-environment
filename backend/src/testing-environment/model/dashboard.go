package model

import "time"

const StartDate = "startDate"
const EndDate = "endDate"

type DashboardDate struct {
	StartDate time.Time `json:"startDate" form:"startDate" query:"startDate"`
	EndDate time.Time `json:"endDate" form:"endDate" query:"endDate"`
}
