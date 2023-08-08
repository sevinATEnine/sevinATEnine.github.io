#include <stdio.h>

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
  for (int i = 0;i < 2;i++) {
    printf("\n%s\n%s\n%s\n%d\n",u[i].username,u[i].password,u[i].name,u[i].id);
    };
};
