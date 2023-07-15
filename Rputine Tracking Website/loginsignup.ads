with Ada.Text_IO;
with Ada.Strings.Unbounded;

procedure Login is

   -- User type to represent user data
   type User_Record is record
      Username : String (1 .. 50);
      Password : String (1 .. 50);
   end record;

   -- Database of registered users
   type User_Database is array (Positive range <>) of User_Record;

   -- Create a sample user database
   Users : User_Database :=
     ((Username => "user1", Password => "pass1"),
      (Username => "user2", Password => "pass2"),
      (Username => "user3", Password => "pass3"));

   -- Login function
   procedure User_Login is
      User_Username : String (1 .. 50);
      User_Password : String (1 .. 50);
      Valid_User : Boolean := False;
   begin
      Ada.Text_IO.Put_Line("=== User Login ===");
      Ada.Text_IO.Put("Username: ");
      Ada.Text_IO.Get_Line(Item => User_Username);
      Ada.Text_IO.Put("Password: ");
      Ada.Text_IO.Get_Line(Item => User_Password);

      -- Check if the user exists in the database
      for User in Users'Range loop
         if User.Username = User_Username and User.Password = User_Password then
            Valid_User := True;
            exit;
         end if;
      end loop;

      if Valid_User then
         Ada.Text_IO.Put_Line("Login successful!");
      else
         Ada.Text_IO.Put_Line("Invalid username or password.");
      end if;
   end User_Login;

   -- Sign-up function
   procedure User_Signup is
      User_Username : String (1 .. 50);
      User_Password : String (1 .. 50);
   begin
      Ada.Text_IO.Put_Line("=== User Sign-up ===");
      Ada.Text_IO.Put("Username: ");
      Ada.Text_IO.Get_Line(Item => User_Username);
      Ada.Text_IO.Put("Password: ");
      Ada.Text_IO.Get_Line(Item => User_Password);

      -- Add the new user to the database
      Users(Users'Last + 1) := (Username => User_Username, Password => User_Password);

      Ada.Text_IO.Put_Line("Sign-up successful!");
   end User_Signup;

begin
   User_Login;
   User_Signup;
end Login;
