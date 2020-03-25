function Email(id, subject, sender, text, read, date) {
    this.id = id;
    this.subject = subject;
    this.sender = sender;
    this.text = text;
    this.read = read;
    this.date = date;
    this.checked = false;
}