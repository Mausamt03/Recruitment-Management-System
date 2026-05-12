public class DateUtils {

    /*
     * Calculate difference in days
     */
    public static Integer daysBetween(Date startDate, Date endDate) {

        if (startDate == null || endDate == null) {
            return 0;
        }

        return endDate.daysBetween(startDate);
    }


    /*
     * Check if SLA breached
     */
    public static Boolean isSLABreached(Date createdDate, Integer slaDays) {

        if (createdDate == null) {
            return false;
        }

        return createdDate.addDays(slaDays) < Date.today();
    }

}