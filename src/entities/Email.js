function Email(id, subject, sender, text, read, dateTime, cut) {
    this.id = id;
    this.subject = subject;
    this.sender = sender;
    this.text = text;
    this.read = read;
    this.dateTime = dateTime;
    this.checked = false;
    this.cut = cut;
}