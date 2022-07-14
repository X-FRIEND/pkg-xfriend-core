import winston from "winston";

const { combine, printf, colorize, logstash } = winston.format;
const consoleFormat = combine(
  colorize(),
  printf(({ level, date, ...info }) => {
    let template = `${level}: ${date || new Date()};`;
    Object.keys(info).forEach((key) => {
      if (key) {
        template = ` ${template} ${key}: ${info[key]};`;
      }
    });
    return template;
  })
);

export default winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    new winston.transports.File({
      filename: "log/index.log",
      format: combine(logstash()),
    }),
  ],
});
