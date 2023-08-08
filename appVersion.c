#include <stdio.h>
#include <string.h>

char user[32];
char pass[32];
int UID;

void main() {
  struct users {
  char username[16];
  char password[32];
  char name[32];
  int id;
};//Establish user template

struct users u[2] = {
  {"c@d3N","(0d3r_4_L1FE","ThatGuyOverThere",1},
  {"$|m0n","Dev","TacoMan",2}
};//Create users
    printf("Enter your username: ");
    scanf("%s",&user);
    printf("Enter your password: ");
    scanf("%s",&pass);
    printf("Enter your UID: ");
    scanf("%d",&UID);
    if (strcmp(user,u[UID].username)==0 && strcmp(pass,u[UID].password)==0) {
        printf("Logged in as: \n %s \n %s",&user,&pass);
    } else {
        printf("Username and or password entered incorrectly.")
    }
};
