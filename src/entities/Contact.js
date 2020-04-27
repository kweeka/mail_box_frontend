function Contact(name, email, id) {
    if(!(name && email && id)){
        throw new Error ("Invalid contact");
    }
    this.name = name;
    this.email = email;
    this.id = id;
}