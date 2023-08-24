#include <stdio.h>
#include <string.h>
#include <stdbool.h>

char user[32];
char pass[32];
int UID;
char command[128];

void main() {
  struct users {
  char username[16];
  char password[32];
  char name[32];
  int id;
};//Establish user template

struct users u[3] = {
  {"c@d3N","(0d3r_4_L1FE","ThatGuyOverThere",1},
  {"$|m0n","Dev","TacoMan",2},
  {"t","t","TEST",3}
};//Create users
    printf("Enter your username: ");
    scanf("%s",&user);
    printf("Enter your password: ");
    scanf("%s",&pass);
    printf("Enter your UID: ");
    scanf("%d",&UID);
    if (strcmp(user,u[UID].username)==0 && strcmp(pass,u[UID].password)==0) {
        printf("Logged in as: %s\n",u[UID].name);
        printf("CST/%s-->",u[UID].name);
        while(true) {
            scanf("%s",&command);
            printf("%s ",command);
        }
    } else {
        printf("Username and or password entered incorrectly.");
    }
};
