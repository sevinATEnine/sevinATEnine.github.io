#include <stdio.h>

struct users {
  char username[16];
  char password[32];
  char name[16];
  int id;
};
void main() {
  struct users u[2] = {{"c@d3N","(0d3r_4_L1FE","ThatGuyOverThere",1},{"$|m0n","Dev","TacoMan",2}};
 printf("\n%s\n%s\n%s\n%d\n",u[0].username,u[0].password,u[0].name,u[0].id);
  printf("%s",u[1].username);
};
