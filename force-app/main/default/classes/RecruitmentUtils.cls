public class RecruitmentUtils {

    /*
     * Check if value changed between old and new record
     */
    public static Boolean isFieldChanged(
        SObject newRecord,
        SObject oldRecord,
        String fieldName
    ) {
        return newRecord.get(fieldName) != oldRecord.get(fieldName);
    }


    /*
     * Check if status transitioned to specific value
     */
    public static Boolean isStatusTransition(
        String newStatus,
        String oldStatus,
        String targetStatus
    ) {
        return newStatus == targetStatus && oldStatus != targetStatus;
    }


    /*
     * Safe null check for strings
     */
    public static Boolean isNotBlank(String value) {
        return value != null && value.trim().length() > 0;
    }

}