#include <iostream>
#include <cstring>
using namespace std;

  struct users {
  char username[16];
  char password[32];
  char name[32];
  int id;
};//Establish user template

struct users u[3] = {
  {"c@d3N","(0d3r_4_L1FE","ThatGuyOverThere",1},
  {"$|m0n","Dev","TacoMan",2},
  {"t","t","TEST_USER",3}
};//Create users
char user[32];
char pass[32];
int UID;
char cmd[64];
void runCmd() {
    printf("CST/%s-->",u[UID].name);
    cin >> cmd;
    if(strcmp(cmd,"help") == 0) {
        cout << "help menu\n";
    } else {
        cout << "nothing\n";
    }
    runCmd();
}
int main() {
    cout << "Enter your username:";
    cin >> user;
    cout << "Enter your password: ";
    cin >> pass;
    cout << "Enter your UID: ";
    cin >> UID;
    if (strcmp(user,u[UID].username)==0 && strcmp(pass,u[UID].password)==0) {
        cout << "Logged in as: " << u[UID].name << "\n";
        runCmd();
    } else {
        cout << "Username, password, and/or UID entered incorrectly.";
    }
    return 0;
};
