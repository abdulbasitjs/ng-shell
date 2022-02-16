import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LogLevel } from '@core/models/log-level.enum';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private static level: LogLevel = LogLevel.DEBUG;

  public static debug(...message: any): void {
    LoggerService.writeToLog(LogLevel.DEBUG, ...message);
  }

  public static log(...message: any) {
    LoggerService.writeToLog(LogLevel.INFO, ...message);
  }

  public static warn(...message: any) {
    LoggerService.writeToLog(LogLevel.WARN, ...message);
  }

  public static error(...message: any) {
    LoggerService.writeToLog(LogLevel.ERROR, ...message);
  }

  private static shouldLog(level: LogLevel): boolean {
    return level >= LogLevel[environment.LOG_LEVEL as keyof typeof LogLevel];
  }

  private static writeToLog(level: LogLevel, ...message: any) {
    if (this.shouldLog(level)) {
      if (level <= LogLevel.INFO) {
        console.log(LoggerService.getLogDate(), ...message);
      } else if (level === LogLevel.ERROR) {
        console.error(LoggerService.getLogDate(), ...message);
      } else if (level === LogLevel.WARN) {
        console.warn(LoggerService.getLogDate(), ...message);
      }
    }
  }

  private static getLogDate(): string {
    const now = new Date();
    return `[${now}] `;
  }
}
