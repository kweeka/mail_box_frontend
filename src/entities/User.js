function User(name, email, group) {
    if(!(name && email && group)){
        throw new Error ("Invalid user");
    }
    this.name = name;
    this.email = email;
    this.group = group;
}