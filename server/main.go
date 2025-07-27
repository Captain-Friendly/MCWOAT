package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
)

func getRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Println("got / request")
	io.WriteString(w, "This is my website!\n")
}

type User struct {
	Name  string `json:"name"`
	Color string `json:"color"`
}

func getUsersJsonInternal() []User {
	content, err := os.ReadFile("./users.json")
	if err != nil {
		fmt.Println("Problem reading file")
	}

	var users []User
	err = json.Unmarshal(content, &users)
	if err != nil {
		fmt.Println("Error during unmarshal")
	}
	return users
}

func getUsersJson(http_writer http.ResponseWriter, http_request *http.Request) {
	fmt.Print("Users have been requested")
	jsonData, err := os.ReadFile("./users.json")
	if err != nil {
		fmt.Println("Problem reading file")
	}
	// var users []User
	// err = json.Unmarshal(content, &users)
	// if err != nil {
	// 	fmt.Println("Error during unmarshal: " + err.Error())
	// }
	// for _, user := range users {
	// 	// io.WriteString(http_writer, "Name: "+user.Name+" Color:"+user.Color+"\n")
	// }
	// response := ResponseData{Status: "success", Message: "request received, sending json"}
	http_writer.Header().Set("Content-Type", "application/json")
	http_writer.Header().Set("Access-Control-Allow-Origin", "*")
	http_writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	http_writer.Write(jsonData)
	// if err := json.NewEncoder(http_writer).Encode(); err != nil {
	// 	http.Error(http_writer, err.Error(), http.StatusInternalServerError)
	// 	return
	// }
}

func addUser(http_writer http.ResponseWriter, http_request *http.Request) {
	fmt.Print("addition of user has been requested")
	hasName := http_request.URL.Query().Has("name")
	name := http_request.URL.Query().Get("name")
	hasColor := http_request.URL.Query().Has("colour")
	color := http_request.URL.Query().Get("colour")

	if hasName && hasColor {
		newUser := User{Name: name, Color: color}

		listOfUsers := getUsersJsonInternal()

		listOfUsers = append(listOfUsers, newUser)

		newList, err := json.MarshalIndent(listOfUsers, "", "\t")

		if err != nil {
			fmt.Println("Error during marshal")
		}

		err = os.WriteFile("./users.json", newList, 0644)
		if err != nil {
			fmt.Println("Problem writing in file")
		}
		http_writer.Header().Set("Access-Control-Allow-Origin", "*")
		http_writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		io.WriteString(http_writer, "Add User Succesfull")
	} else {
		http_writer.Header().Set("Access-Control-Allow-Origin", "*")
		http_writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		io.WriteString(http_writer, "Missing Name or Color")
	}

}

func main() {
	fmt.Println("Go server is running!")
	http.HandleFunc("/addUser", addUser)
	http.HandleFunc("/getUsers", getUsersJson)
	http.HandleFunc("/", getRoot)

	err := http.ListenAndServe(":3333", nil) // listen to all ip adresses in port 3333
	if errors.Is(err, http.ErrServerClosed) {
		fmt.Println("server closed")
	} else if err != nil {
		fmt.Printf("error starting server: %s\n", err.Error())
		os.Exit(1)
	}
}
