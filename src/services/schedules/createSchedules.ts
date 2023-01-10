import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { SchedulesUsersProperties } from "../../entities/schedules_users_properties.entity";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors";
import { IScheduleData } from "../../interfaces/schedules";

const createSchedulesService = async (data: IScheduleData) => {
  const scheduleRepository = AppDataSource.getRepository(
    SchedulesUsersProperties
  );
  const userRepository = AppDataSource.getRepository(Users);
  const propertieRepository = AppDataSource.getRepository(Properties);
  const scheduleQuerybuilder = scheduleRepository.createQueryBuilder(
    "schedules_users_properties"
  );

  const propertieExists = await propertieRepository.findOneBy({
    id: data.propertyId,
  });

  if (!propertieExists) {
    throw new AppError("Property not found", 404);
  }

  const propertieScheduleExists = await scheduleQuerybuilder
    .where("schedules_users_properties.propertyId = :id", {
      id: data.propertyId,
    })
    .getOne();

  const propertieSchedule = await scheduleQuerybuilder
    .where("schedules_users_properties.propertyId = :id", {
      id: data.propertyId,
    })
    .andWhere("schedules_users_properties.date = :date", {
      date: data.date.replace("/", "-").replace("/", "-"),
    })
    .andWhere("schedules_users_properties.hour = :hour", {
      hour: data.hour.concat(":00"),
    })
    .getOne();

  const userSchedule = await scheduleQuerybuilder
    .where("schedules_users_properties.userId = :id", { id: data.userId })
    .andWhere("schedules_users_properties.date = :date", {
      date: data.date.replace("/", "-").replace("/", "-"),
    })
    .andWhere("schedules_users_properties.hour = :hour", {
      hour: data.hour.concat(":00"),
    })
    .getOne();

  const dataDay = data.date;
  const day = dataDay.replace("/", ",").replace("/", ",");
  const tranformDay = new Date(day).getDay();
  const weekDay = tranformDay;

  if (Number(weekDay) === 0 || Number(weekDay) === 6) {
    throw new AppError("Invalid Date", 400);
  }

  const hour = parseFloat(data.hour.replace(":", "."));

  if (hour < 8 || hour > 18.0) {
    throw new AppError("Invalid hour", 400);
  }

  const user = await userRepository.findOneBy({
    id: data.userId,
  });

  if (propertieSchedule) {
    throw new AppError("Property schedule already exists", 409);
  }

  if (propertieScheduleExists) {
    throw new AppError("Property schedule already exists", 409);
  }

  if (userSchedule) {
    throw new AppError("User schedule already exists", 409);
  }

  await scheduleRepository.save({
    hour: data.hour,
    date: data.date,
    property: propertieExists,
    user: user,
  });

  return { message: "Schedule created" };
};

export default createSchedulesService;
