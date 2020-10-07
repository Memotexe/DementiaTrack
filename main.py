"""This is the starting point of the application.

This module is used to induce our application. Whence main() is called,
it creates our application and initiates our LoginController() which in-turn
will begin our program.
After LoginController() is finished, we will exit our system.

    Typical usage example:

    main()
"""

import sys
from PyQt5.QtWidgets import QApplication
from controller.login_controller import LoginController

def main():
    """Main function definition which starts our GUI, prompts login, and exits our GUI.

    This function is used to launch our GUI application which firstly opens
    the login page, and prompts user for input of a username/name. After our
    LoginController() function returns, we exit our application.

    Args:
        N/A.

    Returns:
        N/A.

    Raises:
        N/A.
    """

    app = QApplication([])
    LoginController()
    sys.exit(app.exec_())


if __name__ == '__main__':
    """If our name is main, run our main function."""
    main()
