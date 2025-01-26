import { prisma } from "@prisma";
import { type DriverRepository } from "applications/repositories/driverRepository";
import { userRepository } from "./userRepository";

export const driverRepository: DriverRepository = {
	async save(driverEntity) {
		await userRepository.save(driverEntity);

		const {
			licenseDateObtained,
			licenseNumber,
			birthdate,
			status,
			id,
			clientSiret,
		} = driverEntity.definition;

		const prismaDriver = await prisma.driver.findFirst({
			where: {
				userId: id.value,
			},
		});

		if (prismaDriver) {
			await prisma.driver.update({
				where: {
					userId: id.value,
				},
				data: {
					clientSiret: clientSiret.value,
					licenseDateObtained: licenseDateObtained.value,
					licenseNumber: licenseNumber.value,
					birthDate: birthdate.value,
					status,
				},
			});
		} else {
			await prisma.driver.create({
				data: {
					userId: id.value,
					clientSiret: clientSiret.value,
					licenseDateObtained: licenseDateObtained.value,
					licenseNumber: licenseNumber.value,
					birthDate: birthdate.value,
					status,
				},
			});
		}

		return driverEntity;
	},
};
