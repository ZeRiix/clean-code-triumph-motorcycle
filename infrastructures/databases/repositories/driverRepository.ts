import { prisma } from "@prisma";
import { type DriverRepository } from "applications/repositories/driverRepository";

export const driverRepository: DriverRepository = {
	async save(driverEntity) {
		const {
			licenseDateObtained,
			licenseNumber,
			fullName,
			birthdate,
			status,
		} = driverEntity.definition;

		const prismaDriver = await prisma.driver.findFirst({
			where: {
				licenseNumber: licenseNumber.value,
			},
		});

		if (prismaDriver) {
			await prisma.driver.update({
				where: {
					licenseNumber: licenseNumber.value,
				},
				data: {
					licenseDateObtained: licenseDateObtained.value,
					fullName: fullName.value,
					birthDate: birthdate.value,
					status,
				},
			});
		} else {
			await prisma.driver.create({
				data: {
					licenseDateObtained: licenseDateObtained.value,
					licenseNumber: licenseNumber.value,
					fullName: fullName.value,
					birthDate: birthdate.value,
					status,
				},
			});
		}

		return driverEntity;
	},
};
